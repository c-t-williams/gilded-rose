export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    getType(item = {} as Item) {
        if (item.name === 'Sulfuras, Hand of Ragnaros') return 'Legendary';
        if (item.name === 'Aged Brie') return 'Cheese';
        if (item.name === 'Backstage passes to a TAFKAL80ETC concert') return 'Backstage Pass';
        if (item.name === 'Conjured Mana Cake') return 'Conjured';

        return 'Standard';
    } 

    updateQuality() {
        for (let i = 0; i < this.items.length; i++) {
            // Getting Item Type
            let item: Item = this.items[i];
            const itemType: string = this.getType(item);

            // Escape hatch, ignoring Legendary Items
            if (itemType === 'Legendary') continue;

            if (itemType != 'Cheese' && itemType != 'Backstage Pass') {
                if (this.items[i].quality > 0) {
                    if (itemType != 'Conjured') {
                        this.items[i].quality = this.items[i].quality - 1
                    } else {
                        this.items[i].quality = this.items[i].quality - 2
                    }
                }
            } else {
                if (this.items[i].quality < 50) {
                    this.items[i].quality = this.items[i].quality + 1
                    if (itemType === 'Backstage Pass') {
                        if (this.items[i].sellIn < 11) {
                            if (this.items[i].quality < 50) {
                                this.items[i].quality = this.items[i].quality + 1
                            }
                        }
                        if (this.items[i].sellIn < 6) {
                            if (this.items[i].quality < 50) {
                                this.items[i].quality = this.items[i].quality + 1
                            }
                        }
                    }
                }
            }

            this.items[i].sellIn = this.items[i].sellIn - 1;

            if (this.items[i].sellIn < 0) {
                if (itemType != 'Cheese') {
                    if (itemType != 'Backstage Pass') {
                        if (this.items[i].quality > 0) {
                            if (itemType != 'Conjured') {
                                this.items[i].quality = this.items[i].quality - 1
                            } else {
                                this.items[i].quality = this.items[i].quality - 2
                            }
                        }
                    } else {
                        this.items[i].quality = this.items[i].quality - this.items[i].quality
                    }
                } else {
                    if (this.items[i].quality < 50) {
                        this.items[i].quality = this.items[i].quality + 1
                    }
                }
            }
        }

        return this.items;
    }
}
