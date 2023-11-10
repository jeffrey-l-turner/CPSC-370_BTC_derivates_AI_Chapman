use strict_encoding::{StrictEncode, StrictDecode, StrictDumb, StrictType};
use rgbstd::stl::Precision;
use serde::{Serialize, Deserialize};

// Define the LIB_NAME_RGB_CONTRACT constant which will be used in the strict_type attribute.
const LIB_NAME_RGB_CONTRACT: &str = "rgb20";

// Define a unique type ID for the Nominal struct
pub const NOMINAL_TYPE_ID: u16 = 0x0100;

#[derive(Clone, Eq, PartialEq, Debug, StrictDumb, StrictEncode, StrictDecode, Serialize, Deserialize)]
#[strict_type(type_id = NOMINAL_TYPE_ID, lib = LIB_NAME_RGB_CONTRACT)]
#[serde(crate = "serde_crate", rename_all = "camelCase")]
pub struct Nominal {
    pub ticker: String,
    pub name: String,
    pub description: Option<String>,
    pub precision: Precision,
}

// Implementations for StrictSerialize and StrictDeserialize are provided by the derive macros
