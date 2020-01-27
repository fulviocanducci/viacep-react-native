const service = {
  get: async value => {
    const source = await fetch(`https://viacep.com.br/ws/${value}/json/`);
    const result = await source.json();
    const data = [];
    let status = true;
    Object.keys(result).map(x => {
      if (result[x] && result[x] !== '') {
        if (x === 'erro') {
          status = false;
        }
        data.push({ item: x, value: result[x] });
      }
    });

    return {
      data,
      result,
      status
    };
  }
};

export default service;
