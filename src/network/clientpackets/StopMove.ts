import GameClientPacket from "./GameClientPacket";
import Location from "../../model/Location";

export default class StopMove extends GameClientPacket {
  //@Override
  readImpl(): boolean {
    let _id = this.readC();
    let _objectId = this.readD();
    let [_x, _y, _z] = this.readLoc();

    let _heading = this.readD();

    if (_objectId === this.Client.ActiveChar.getObjectId()) {
      this.Client.ActiveChar.setLocation(new Location(_x, _y, _z, _heading));
    }

    var npc = this.Client.CreaturesList.getEntryByObjectId(_objectId);
    if (npc) {
      npc.setLocation(new Location(_x, _y, _z, _heading));
    }

    var npc = this.Client.PartyList.getEntryByObjectId(_objectId);
    if (npc) {
      npc.setLocation(new Location(_x, _y, _z, _heading));
    }

    var npc = this.Client.PetList.getEntryByObjectId(_objectId);
    if (npc) {
      npc.setLocation(new Location(_x, _y, _z, _heading));
    }

    return true;
  }

  //@Override
  run(): void {}
}
