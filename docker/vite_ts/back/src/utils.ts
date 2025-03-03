import { readFileSync } from "fs";

export function getSecret(name: string) {
    let secrets = JSON.parse(readFileSync('./secrets', 'utf8'));
    // Check if name is in secrets object.  Return value if yes.  Throw error if not.
    if (name in secrets.keys) {
        return secrets[name]
    } else {
        throw new Error(`${name} was not found in secrets!`);
    }
}