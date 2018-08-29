export class Incidencias {
  _id: string;
  cat: string;
  area: string;
  item: string;

  constructor(_id,cat,area,item){
    this._id = _id;
    this.cat = cat;
    this.area = area;
    this.item = item;
  }
}
