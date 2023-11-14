use amplify::{bmap, none};
use rgbstd::schema::{StateSchema, TransitionType, ActionAbi, OwnedRightType, DataFormat};
use rgbstd::schema::{Schema, GenesisSchema};
use strict_encoding::{StrictEncode, StrictDecode};

// Define your custom types and their properties
#[derive(Clone, Debug, StrictEncode(lib = "strict_encoding"), StrictDecode(lib = "strict_encoding"))]
pub struct MyCustomToken {
    ticker: String,
    name: String,
    description: String,
    total_supply: u64,
}

 // Define the schema for an RGB20 token
 pub fn rgb20_schema() -> Schema<()> {
    Schema {
        rgb_features: none!(),
        root_id: none!(),
        field_types: bmap! {
            // Define the fields for your token
            FieldType::AsciiString => DataFormat::String(256),
            FieldType::Unsigned64 => DataFormat::Unsigned(64, 0, u64::MAX), // Total supply
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
                        name: "transfer".to_string(),
                        description: "Transfer tokens to another address".to_string(),
                        args: bmap! {
                            // Arguments for the transfer action
                            ArgAbi::required("amount", DataFormat::Unsigned(64, 0, u64::MAX)),
                            ArgAbi::required("to", DataFormat::Bytes),
                        },
                    },
                },
            },
        },
        public_rights: none!(),
        genesis: GenesisSchema {
            metadata: bmap! {
                FieldType::AsciiString => once!(b"Ticker"),
                FieldType::AsciiString => once!(b"Name"),
                FieldType::AsciiString => once!(b"Description"),
                FieldType::Unsigned64 => once!(b"TotalSupply"),
            },
            owned_rights: bmap! {
                OwnedRightType::Assets => none!(),
                OwnedRightType::Custom(0) => none!(),
            },
            public_rights: none!(),
            abi: none!(),
        },
    }
}
use amplify::Wrapper;
use rgb_std::schema::{Constants, GenesisSchema, Schema, TransitionSchema};
use rgb_std::type_map;
use rgb_std::type_map::TypeMap;
use rgb_std::prelude::*;
use strict_encoding::{StrictDecode, StrictEncode};

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
        rgb_features: type_map! {},
        root_id: Default::default(),
        field_types: type_map! {
            // Define the fields for your token
            FieldType::AsciiString => DataFormat::String(256),
            FieldType::Unsigned64 => DataFormat::Unsigned(64, 0, u64::MAX), // Total supply
        },
        owned_right_types: type_map! {
            // Right to own tokens
            OwnedRightType::Inflation => TransitionSchema {
                closes: None,
                metadata: type_map! {},
                defines: type_map! {
                    OwnedRightType::Inflation => StateSchema {
                        format: DataFormat::Unsigned(64, 0, u64::MAX), // Token balance
                        abi: type_map! {},
                    },
                },
                abi: type_map! {},
            },
        },
        public_right_types: type_map! {},
        genesis: GenesisSchema {
            metadata: type_map! {
                FieldType::AsciiString => once!(b"Ticker"),
                FieldType::AsciiString => once!(b"Name"),
                FieldType::AsciiString => once!(b"Description"),
                FieldType::Unsigned64 => once!(b"TotalSupply"),
            },
            owned_rights: type_map! {
                OwnedRightType::Inflation => None,
            },
            public_rights: type_map! {},
            abi: type_map! {},
        },
        extensions: type_map! {},
        transitions: type_map! {},
        constants: Constants::default(),
    }
}
