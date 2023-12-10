#!/bin/bash

# Navigate to the src directory (adjust if your script is placed elsewhere)
cd src/

# Create new directories
mkdir -p assets components/ConversionRates components/Header components/Navigation components/Portfolio components/SwapForm utils

# Move assets
mv chapman_panther.png assets/
mv logo.svg assets/

# Move components and their related files
mv ConversionRates.css components/ConversionRates/
mv ConversionRates.tsx components/ConversionRates/

mv Header.css components/Header/
mv Header.test.tsx components/Header/
mv Header.tsx components/Header/

mv Navigation.css components/Navigation/
mv Navigation.test.tsx components/Navigation/
mv Navigation.tsx components/Navigation/

mv Portfolio.css components/Portfolio/
mv Portfolio.tsx components/Portfolio/

mv SwapForm.css components/SwapForm/
mv SwapForm.test.tsx components/SwapForm/
mv SwapForm.tsx components/SwapForm/

# The dex files are already in the correct place, so we don't need to move them.

# Inform the user
echo "Reorganization complete!"

