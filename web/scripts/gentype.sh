get_current_directory() {
    current_file="${PWD}/${0}"
    echo "${current_file%/*}"
}

CWD=$(get_current_directory)

PATH_TO_OFFER_JSON="$CWD/../../offer_service/api/offer_service/v1/api.swagger.json"
PATH_TO_ACCOUNT_JSON="$CWD/../../account_core/api/account_core/account_core.swagger.json"

yarn swagger-typescript-api -p $PATH_TO_OFFER_JSON -o ./services -n offer.ts
yarn swagger-typescript-api -p $PATH_TO_ACCOUNT_JSON -o ./services -n account.ts