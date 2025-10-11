#!/bin/bash
# Generic wrapper script to export environment variables before starting any MCP server
source ~/.bashrc
exec "$@"
