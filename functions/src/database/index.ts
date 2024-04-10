import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const connect = async (url: string) => {
  try {
    await mongoose.connect(url);

    mongoose.connection.on('error', (error) => console.log({ error }));
    mongoose.connection.on('open', () => console.log('Conexão com o banco criada'));

  } catch (error) {
    console.log(error);
    return;
  }
};

const PlayerSchema = new Schema({
  name: String,
  score: { type: Number, default: 0 },
});

const RequestSchema = new Schema({
  id_player: {
    type: Schema.ObjectId,
    ref: 'players',
  },
  placement: { type: Number, default: 12 },
  created_at: { type: Date, default: Date.now() },
});

const PlayerModel = mongoose.model('players', PlayerSchema);
const RequestModel = mongoose.model('requests', RequestSchema);

export { connect, PlayerModel, RequestModel };
