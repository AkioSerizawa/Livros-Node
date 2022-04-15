import livros from "../models/Livro.js";

class LivroController {
  static listarLivros = (req, res, next) => {
    livros
      .find()
      .populate("autor")
      .exec((err, livros) => {
        res.status(200).json(livros);
      });
  };

  static listarLivrosId = (req, res, next) => {
    const id = req.params.id;

    livros
      .findById(id)
      .populate("autor", "nome")
      .exec((err, livros) => {
        if (err) {
          res
            .status(400)
            .send({ message: `${err.message} - ID do livro não localizado` });
        } else {
          res.status(200).send(livros);
        }
      });
  };

  static listarLivrosPorEditora = (req, res, next) => {
    const editora = req.query.editora;

    livros.find({ editora: editora }, 
      {},
      (err, livros) => {
        res.status(200).json(livros);
      });
  };

  static cadastrarLivro = (req, res, next) => {
    let livro = new livros(req.body);

    livro.save((err) => {
      if (err) {
        res
          .status(500)
          .send({ message: `${err.message} - falha ao cadastrar Livro` });
      } else {
        res.status(201).send(livro.toJSON());
      }
    });
  };

  static atualizarLivro = (req, res, next) => {
    const id = req.params.id;

    livros.findByIdAndUpdate(id, { $set: req.body }, (err) => {
      if (!err) {
        res.status(200).send({ message: "Livro atualizado com sucesso" });
      } else {
        res
          .status(500)
          .send({ message: `${err.message} - falha ao atualizar Livro` });
      }
    });
  };

  static excluirLivro = (req, res, next) => {
    const id = req.params.id;

    livros.findByIdAndDelete(id, { $delete: req.body }, (err) => {
      if (!err) {
        res.status(200).send({ message: "Livro foi excluído com sucesso" });
      } else {
        res
          .status(500)
          .send({ message: `${err.message} - falha ao excluir livro` });
      }
    });
  };
}

export default LivroController;
