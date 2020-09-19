import { debugServiceMonster, debugRequest } from '../debuggers';
import Integrations from '../models/Integrations';
// import { getConfig, getEnv, sendRequest } from '../utils';

const initServiceMonster = async app => {
  debugServiceMonster("initServicemonster", app)
  app.post('/service-monster/create-integration', async (req, res, next) => {
    debugRequest(debugServiceMonster, req);

    const { integrationId } = req.body;
    // const { phoneNumber } = JSON.parse(data);

    // Check existing Integration
    const integration = await Integrations.findOne({ kind: 'service-monster' }).lean();

    if (integration) {
      return next(`Integration already exists with this phone number`);
    }

    try {
      await Integrations.create({
        kind: 'service-monster',
        erxesApiId: integrationId,
        // phoneNumber,
        // recordUrl,
      });
    } catch (e) {
      debugServiceMonster(`Failed to create integration: ${e}`);
      next(e);
    }

    return res.json({ status: 'ok' });
  });
};

export default initServiceMonster;
