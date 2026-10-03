{
  description = "Site dev shell";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in {
        devShells.default = pkgs.mkShell {
          packages = [
            pkgs.git
            pkgs.nodejs_24
            pkgs.pipenv
            pkgs.php83
            pkgs.python311
          ];
          shellHook = ''
            export PATH="${pkgs.python311}/bin:$PATH"
            echo ""
            echo "$(tput bold)Node$(tput sgr0) $(node --version)"
            echo "$(tput bold)PHP$(tput sgr0) $(php --version | head -1)"
            echo "$(tput bold)Python$(tput sgr0) $(python --version)"
            echo ""
          '';
        };
      });
}
