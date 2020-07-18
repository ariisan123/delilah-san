const { productControl } = require('../controllers/productController');

const post = {
  attriNames: (req, res, next) => {
    const newProduct = Object.keys(req.body).toString();
    const productAttributes = productControl.getAttributes(1, 4).toString();
    if (newProduct === productAttributes) {
      next()
    } else {
      res.status(400).send('Parámetros no válidos')
    }
  },
  attriOk: (req, res, next) => {
    const attributes = Object.values(req.body);

    if (
      attributes[0].length >= 3 &&
      attributes[1].length >= 3 &&
      typeof (attributes[2]) == 'number' &&
      typeof (attributes[3]) == 'number'
    ) {
      next();
    } else {
      res.status(400).send('Valores inválidos')
    }
  },
  new: async (req, res) => {
    try {
      const data = await productControl.new(req.body)
      res.status(201).json(data)
    } catch (err) {
      res.status(500).json(err)
    }
  }

}

const get = {
  all: async (req, res) => {
    try {
      const products = await productControl.getAll();
      res.status(200).json(products);

    } catch (err) {
      res.status(500).json(err);
    }
  }
}

const put = {
  exist: async (req, res, next) => {
    const { id } = req.params;
    const exist = await productControl.getOne('id', id);
    if (exist) {
      next();
    } else {
      res.status(404).send('Producto no encontrado');
    }
  },
  attriNames: (req, res, next) => {
    const productAttributes = productControl.getAttributes(1, 4);
    const reqKeys = Object.keys(req.body);

    let count = 0;
    reqKeys.forEach(key => {
      const index = productAttributes.indexOf(key);
      if (index < 0) {
        res.status(400).send('Atributos no válidos.')
      } else {
        count++
      }
    })

    if (4 >= count > 0) {
      next()
    }

  },
  attriOk: (req, res, next) => {
    if (productControl.attriNull(req.body) === Object.keys(req.body).length) {
      next()
    } else {
      res.status(400).send('Valores invalidos')
    }
  },
  update: async (req, res) => {
    try {
      await productControl.update(req.params.id, req.body);
      const updated = await productControl.getOne('id', req.params.id)
      res.status(200).json(updated)

    } catch (err) {
      res.status(500).json(err)
    }
  }
}


module.exports = { post, get, put };