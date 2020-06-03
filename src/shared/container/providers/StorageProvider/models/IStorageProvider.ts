export default interface IStorogeProvider {
  saveFile(file: string): Promise<string>;
  deleteFile(file: string): Promise<void>;
}
