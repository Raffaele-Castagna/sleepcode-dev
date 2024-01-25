const admin = jest.createMockFromModule('firebase-admin');

admin.firestore = jest.fn(() => ({
  auth: jest.fn(() => ({
        getUser: jest.fn()
  })),
  collection: jest.fn(() => ({
    orderBy : jest.fn(),
    doc: jest.fn(() => ({
      set: jest.fn(),
      get: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      orderBy : jest.fn(),
    })),
  })),
}));

module.exports = admin;