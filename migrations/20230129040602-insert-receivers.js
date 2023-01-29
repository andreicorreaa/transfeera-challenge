module.exports = {
  async up(db) {
    return db.collection('receivers').insertMany([
      {
        name: 'Sophie Rayssa Monteiro',
        email: 'sophie.rayssa.monteiro@boll.com.br',
        phone: '(83) 3660-5250',
        doc: '148.893.819-96',
        bank: 'Caixa',
        branch: '0000-1',
        randomKey: '06062676403143752068771807051321',
        status: 'Rascunho',
      },
      {
        name: 'Mário Anthony Iago Moraes',
        email: 'mario_anthony_moraes@academiagolf.com.br',
        phone: '(83) 3660-5250',
        doc: '576.234.380-42',
        bank: 'Banco do Brasil',
        branch: '00210-1',
        randomKey: '06062676403143752068771807051321',
        status: 'Validado',
      },
    ]);
  },
  async down() {
    return Promise.resolve('ok');
  },
};
