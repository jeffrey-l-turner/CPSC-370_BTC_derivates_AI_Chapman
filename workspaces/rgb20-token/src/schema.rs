use amplify::{bmap, none, type_map};
use rgbstd::schema::{Schema, GenesisSchema};
use strict_encoding::{StrictEncode, StrictDecode};

// Define your custom types and their properties
#[derive(Clone, Debug, StrictEncode, StrictDecode)]
pub struct MyCustomToken {
    ticker: String,
    name: String,
    description: String,
    total_supply: u64,
}

 // Define the schema for an RGB20 token
 pub fn rgb20_schema() -> Schema {
    Schema {
        rgb_features: none!(),
        root_id: none!(),
        field_types: bmap! {
            // Define the fields for your token
            FieldType::AsciiString => DataFormat::String(256),
            FieldType::Unsigned64 => DataFormat::Unsigned(64, 0, u64::MAX), // Total
supply
        },
        owned_rights: bmap! {
            // Right to own tokens
            OwnedRightType::Assets => StateSchema {
                format: DataFormat::Unsigned(64, 0, u64::MAX), // Token balance
                abi: none!(),
            },
            // Right to transfer tokens
            OwnedRightType::Custom(0) => StateSchema {
                format: DataFormat::Structure(vec![
                    DataFormat::Unsigned(64, 0, u64::MAX), // Token amount
                    DataFormat::Bytes, // Receiver's public key hash
                ]),
                abi: bmap! {
                    // Define the ABI for transferring tokens
                    TransitionType::Custom(0) => ActionAbi {
                        name: s!("transfer"),
                        description: s!("Transfer tokens to another address"),
                        args: bmap! {
                            // Arguments for the transfer action
                            ArgAbi::required("amount", DataFormat::Unsigned(64, 0,
u64::MAX)),
                            ArgAbi::required("to", DataFormat::Bytes),
                        },
                    },
                },
            },
        },
        public_rights: none!(),
        genesis: GenesisSchema {
            metadata: type_map! {
                FieldType::AsciiString => once!(b"Ticker"),
                FieldType::AsciiString => once!(b"Name"),
                FieldType::AsciiString => once!(b"Description"),
                FieldType::Unsigned64 => once!(b"TotalSupply"),
            },
            owned_rights: type_map! {
                OwnedRightType::Assets => none!(),
                OwnedRightType::Custom(0) => none!(),
            },
            public_rights: none!(),
            abi: none!(),
        },
    }
}
