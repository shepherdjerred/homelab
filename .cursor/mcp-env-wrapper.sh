#!/bin/bash
# Generic wrapper script to export environment variables before starting any MCP server
source ~/.bashrc

# Handle environment variable mapping/substitution
# If API_ACCESS_TOKEN is set to a placeholder, substitute it
if [[ "$API_ACCESS_TOKEN" == '${HOME_ASSISTANT_API_ACCESS_TOKEN}' ]]; then
    export API_ACCESS_TOKEN="$HOME_ASSISTANT_API_ACCESS_TOKEN"
elif [[ -z "$API_ACCESS_TOKEN" && -n "$HOME_ASSISTANT_API_ACCESS_TOKEN" ]]; then
    export API_ACCESS_TOKEN="$HOME_ASSISTANT_API_ACCESS_TOKEN"
fi

exec "$@"
