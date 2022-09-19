class DAOFactory {
  static getPersistency = async (entity, type) => {
    try {
      const { default: persistency } = await import(`./${entity}/${type}.js`);
      return persistency.getInstance();
    } catch (error) {
      console.log(error);
      // throw `${error}`;
    }
  };
}

export default DAOFactory;
