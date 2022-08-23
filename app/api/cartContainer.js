import fs from 'fs';

class cartContainer {
  constructor(fileRoute) {
    this.fileRoute = fileRoute;
  }

  #viewFile = async () => {
    let messages = [];
    try {
      messages = await fs.promises.readFile(this.fileRoute, 'utf-8');
      if (messages === '') messages = '[]';
    } catch (error) {
      return [];
    }
    return JSON.parse(messages);
  };
}

export { cartContainer };
