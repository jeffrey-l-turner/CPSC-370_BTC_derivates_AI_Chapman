 use rgbstd::schema::{GenesisSchema, Schema, TransitionSchema};
 use strict_encoding::{StrictDecode, StrictEncode};
 // Removed explicit import of `type_map` macro to simplify macro imports

 // Define your custom types and their properties
 #[derive(Clone, Debug)]
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
