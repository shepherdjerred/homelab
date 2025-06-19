#!/bin/bash

# Source mise activation to make tools available in PATH
source ~/.bashrc

# Install pre-commit hooks
echo "Installing pre-commit hooks..."
pre-commit install
pre-commit install -t commit-msg

echo "Setup complete!"
