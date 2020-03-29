const crud = Modell => {
    return {
        create: data => new Promise((res, rej) => {
            Modell.create(data, (err, obj) => {
                if (err) rej(err);
                res(obj);
            });
        }),
        getById: (id) => new Promise((res, rej) => {
            Modell.findById(id, (err, obj) => {
                if (err) rej(err);
                res(obj);
            });
        }),
        updateById: (id, data) => new Promise((res, rej) => {
            Modell.findByIdAndUpdate(id, data, (err, obj) => {
                if (err) rej(err);
                res(obj);
            });
        }),
        deleteById: (id) => new Promise((res, rej) => {
            Modell.findByIdAndDelete(id, err => {
                if (err) rej(err);
                res();
            });s
        })
    }
};

module.exports = crud;