use rgbstd::interface::{rgb20, ContractBuilder};

use std::convert::Infallible;
use std::fs;

use amplify::hex::FromHex;
use bp::{Chain, Outpoint, Tx, Txid};
use rgb_schemata::{nia_rgb20, nia_schema};
use rgbstd::containers::BindleContent;
use rgbstd::contract::WitnessOrd;
use rgbstd::resolvers::ResolveHeight;
use rgbstd::stl::{
    Amount, ContractData, DivisibleAssetSpec, Precision, RicardianContract, Timestamp,
};
use rgbstd::validation::{ResolveTx, TxResolverError};
use strict_encoding::StrictDumb;

struct DumbResolver;

impl ResolveTx for DumbResolver {
    fn resolve_tx(&self, _txid: Txid) -> Result<Tx, TxResolverError> {
        Ok(Tx::strict_dumb())
    }
}

impl ResolveHeight for DumbResolver {
    type Error = Infallible;
    fn resolve_height(&mut self, _txid: Txid) -> Result<WitnessOrd, Self::Error> {
        Ok(WitnessOrd::OffChain)
    }
}

fn main() {
    let name = "Loyalty Points";  // name of token
    let decimal = Precision::None; // Decimal: 0
    let desc = "Loyalty Points for XYZ Retail Store";  // token description
    let spec = DivisibleAssetSpec::with("RGB20", name, decimal, Some(desc)).unwrap();
    let terms = RicardianContract::default();
    let contract_data = ContractData { terms, media: None };
    let created = Timestamp::now();
    let txid = "9fef7f1c9cd1dd6b9ac5c0a050103ad874346d4fdb7bcf954de2dfe64dd2ce05";
    // token owner address in utxo
    let beneficiary = Outpoint::new(Txid::from_hex(txid).unwrap(), 0);

    const ISSUE: u64 = 10_000_000;  // Initial supply of loyalty points

    let contract = ContractBuilder::with(rgb20(), nia_schema(), nia_rgb20())
        .expect("schema fails to implement RGB20 interface")
        .set_chain(Chain::Testnet3)
        .add_global_state("spec", spec)
        .expect("invalid nominal")
        .add_global_state("created", created)
        .expect("invalid creation date")
        .add_global_state("issuedSupply", Amount::from(ISSUE))
        .expect("invalid issued supply")
        .add_global_state("data", contract_data)
        .expect("invalid contract text")
        .add_fungible_state("assetOwner", beneficiary, ISSUE)
        .expect("invalid asset amount")
        .issue_contract()
        .expect("contract doesn't fit schema requirements");

    let contract_id = contract.contract_id();
    debug_assert_eq!(contract_id, contract.contract_id());

    let bindle = contract.bindle();
    eprintln!("{bindle}");
    bindle.save("contracts/loyalty-points.contract.rgb")
        .expect("unable to save contract");
    fs::write("contracts/loyalty-points.contract.rgba", bindle.to_string())
        .expect("unable to save contract");
}
