// Ensure that the macro is properly exported and can be used in other modules
#[macro_export]
macro_rules! type_map {
    // Match against an empty call to the macro, returning an empty HashMap
    () => {{
        ::std::collections::HashMap::new()
    }};
    
    // Match against a non-empty comma-separated list of key-value pairs
    ($($key:expr => $val:expr),+ $(,)?) => {{
        let mut map = ::std::collections::HashMap::new();
        $(
            map.insert($key, $val);
        )+
        map
    }};
}
