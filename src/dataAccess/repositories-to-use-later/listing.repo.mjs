import { ListingModel } from '../models';
import { getUpdatedEntity } from '../../helpers';

export const ListingRepo = {
  create: async (id, { images, price, description, address }) => {
    const createdListing = await ListingModel.create({
      agentId: id,
      ownerId: id,
      images,
      price,
      description,
      address,
    });
    return createdListing;
  },
  filter: async id => await ListingModel.findAndCountAll({ where: { ownerId: id } }),
  get: async (loginId, itemId) => await ListingModel.findOne({ where: { ownerId: loginId, id: itemId } }),
  update: async (loginId, { images, price, description, address }, itemId) => {
    const updateListing = {
      images,
      price,
      description,
      address,
    };
    const updated = await ListingModel.update(updateListing, { where: { ownerId: loginId, id: itemId }, returning: true, raw: true }).then(res => getUpdatedEntity(res));

    return updated;
  },
  delete: async (loginId, itemId) => {
    const dbObj = await ListingModel.findOne({ where: { ownerId: loginId, id: itemId } });
    if (!dbObj) return undefined;
    const deleted = await dbObj.destroy();
    return { id: deleted.id, message: 'Deleted Successfully' };
  },
};
