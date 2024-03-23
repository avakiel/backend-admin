export function getItemId(name: string) {
  return name.toLowerCase().split(' ').join('-');
}
