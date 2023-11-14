#[derive(Clone, Eq, PartialEq, Debug)]
#[derive(StrictEncode, StrictDecode)]
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
            OS_CUSTOM => StateSchema::Custom(CustomStateType::YourCustomTypeHere
// Replace with your actual custom type
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
