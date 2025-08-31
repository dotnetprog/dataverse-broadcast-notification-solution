export function cleanGuid(guid: string): string {
    return guid.replace("{", "").replace("}", "");
}