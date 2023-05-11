import Express from 'express';
import { EventBus } from '../events';
import { Events } from '../constants';
import { LogArea, LogLevel, log } from '../log';

export default abstract class Webhooks {
  public static init(): void {
    const app = Express();

    app.use(Express.json());

    app.use('/webhooks/gatherings', (req, res) => {
      EventBus.eventEmitter.emit(Events.GatheringScheduled, req.body);
      res.status(200).send();
    });

    app.listen(3001, () =>
      log(LogLevel.Info, LogArea.Webhooks, 'Webhooks server is listening on port 3001')
    );
  }
}