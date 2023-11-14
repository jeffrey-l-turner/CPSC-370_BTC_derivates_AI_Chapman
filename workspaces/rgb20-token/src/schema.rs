use lazy_static::lazy_static;
use strict_encoding::{StrictEncode, StrictDecode, StrictSerialize, StrictDeserialize};
use strict_types::{StrictType, libname};
use amplify::{bset, bmap, tiny_bset, tiny_bmap, confined_bmap, zero};
use rgbstd::stl::{Ticker, Precision};
use rgbstd::interface::{IfaceImpl, rgb20};
use rgbstd::schema::{SubSchema, Schema, GenesisSchema};
use rgbstd::schema::{AluScript, Script};
use strict_types::{Ty, SemId};
use std::result::Result;
use std::error::Error;
use strict_types::LibBuilder;

// Define missing types
type ContractName = String; // Replace with actual type definition if different
type ContractDetails = String; // Replace with actual type definition if different

#[derive(Clone, Eq, PartialEq, Debug, StrictEncode, StrictDecode, StrictSerialize, StrictDeserialize)]
#[strict_type(lib = "rgb20_token")]
#[cfg_attr(
    feature = "serde",
    derive(Serialize, Deserialize),
    serde(crate = "serde_crate", rename_all = "camelCase")
)]
pub struct Nominal {
    ticker: Ticker,
    name: ContractName,
    details: Option<ContractDetails>,
    precision: Precision,
}
impl StrictSerialize for Nominal {}
impl StrictDeserialize for Nominal {}

const LIB_NAME_RGB_CONTRACT: &str = "rgb_contract";

use some_library::Lib; // Replace with the actual library path

static LIB: Result<Lib, Error> = LibBuilder::new(libname!(LIB_NAME_RGB_CONTRACT))
    .process::<Nominal>()
    .compile(none!());

lazy_static! {
    static ref TYPES: Result<System, Error> = {
        SystemBuilder::new()
            .import(LIB.clone().expect("Failed to initialize LIB"))
            .finalize()
    };
}

fn iface_impl() -> IfaceImpl {
    let schema = schema();
    let iface = rgb20();

    IfaceImpl {
        schema_id: schema.schema_id(),
        iface_id: iface.iface_id(),
        global_state: tiny_bset! {
            NamedType::with(GS_NOMINAL, tn!("Nominal")),
            NamedType::with(GS_CONTRACT, tn!("ContractText")),
        },
        assignments: tiny_bset! {
            NamedType::with(OS_ASSETS, tn!("Assets")),
        },
        valencies: none!(),
        transitions: tiny_bset! {
            NamedType::with(TS_TRANSFER, tn!("Transfer")),
        },
        extensions: none!(),
    }
}

fn schema() -> SubSchema {
    Schema {
        ffv: zero!(),
        subset_of: None,
        type_system: types.type_system(),
        global_types: tiny_bmap! {
            GS_NOMINAL =>
GlobalStateSchema::once(types.get("RGBContract.Nominal")),
            GS_CONTRACT =>
GlobalStateSchema::once(types.get("RGBContract.ContractText")),
        },
        owned_types: tiny_bmap! {
            OS_ASSETS => StateSchema::Fungible(FungibleType::Unsigned64Bit),
            OS_NOMINAL => StateSchema::Custom(Nominal),
        },
        valency_types: none!(),
        genesis: GenesisSchema {
            metadata: Ty::<SemId>::UNIT.id(None),
            globals: tiny_bmap! {
                GS_NOMINAL => Occurrences::Once,
                GS_CONTRACT => Occurrences::Once,
            },
            assignments: tiny_bmap! {
                OS_ASSETS => Occurrences::OnceOrMore,
            },
            valencies: none!(),
        },
        extensions: none!(),
        transitions: tiny_bmap! {
            TS_TRANSFER => TransitionSchema {
                metadata: Ty::<SemId>::UNIT.id(None),
                globals: none!(),
                inputs: tiny_bmap! {
                    OS_ASSETS => Occurrences::OnceOrMore
                },
                assignments: tiny_bmap! {
                    OS_ASSETS => Occurrences::OnceOrMore
                },
                valencies: none!(),
            }
        },
        script: Script::AluVM(AluScript {
            libs: confined_bmap! { alu_id => alu_lib },
            entry_points: confined_bmap! {
                EntryPoint::ValidateOwnedState(OS_ASSETS) => LibSite::with(0,
alu_id)
            },
        }),
    }
}
