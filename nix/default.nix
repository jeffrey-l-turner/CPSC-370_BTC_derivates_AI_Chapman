# { nixpkgs ? import <nixpkgs> {} }:
# 
# let
#    pkgs = import nixpkgs { system = builtins.currentSystem or "x86_64-darwin.default"; };
# #  system = "x86_64-darwin.default";
# 
# in {
#   buildInputs = with pkgs; [
#     rustc
#     cargo
#     rustfmt
#     rust-analyzer
#     clippy
#     git
#     ps
#     which
#   ];
# }

{
  description = "A development environment for a Rust project";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-21.05";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};

        rustEnv = pkgs.buildRustPackage rec {
          pname = "rust-dev";
          version = "1.0.0";

          src = ./.;

          nativeBuildInputs = with pkgs; [
            pkgconfig
            openssl
            cmake
            protobuf
            which
            zlib
            Security
          ];

          buildInputs = with pkgs; [
            pkgconfig
            openssl
            cmake
            protobuf
            which
            zlib
            Security
          ];

          doCheck = false;

          doInstallCheck = false;

          meta = with pkgs.lib; {
            description = "Rust development environment";
            license = licenses.mit;
            platforms = platforms.unix;
          };
        };
        neovim = pkgs.neovim;
        rust-analyzer = pkgs.rust-analyzer;
      in
      {
        devShell = pkgs.mkShell {
          buildInputs = [
            rustEnv
            neovim
            rust-analyzer
          ];

          shellHook = ''
            echo "Welcome to the Rust development environment!"
          '';
        };
      });
}
