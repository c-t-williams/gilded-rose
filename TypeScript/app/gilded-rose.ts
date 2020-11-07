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

        // If none of the above, the item must be Standard
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
                if (item.quality > 0) {
                    if (itemType != 'Conjured') {
                        item.quality = item.quality - 1
                    } else {
                        item.quality = item.quality - 2
                    }
                }
            } else {
                if (item.quality < 50) {
                    item.quality = item.quality + 1
                    if (itemType === 'Backstage Pass') {
                        if (item.sellIn < 11) {
                            item.quality = item.quality + 1
                        }
                        if (item.sellIn < 6) {
                            item.quality = item.quality + 1
                        }
                    }
                }
            }

            // Decrease Sellby Date
            item.sellIn = item.sellIn - 1;

            if (item.sellIn < 0) {
                if (itemType != 'Cheese') {
                    if (itemType != 'Backstage Pass') {
                        if (itemType != 'Conjured') {
                            item.quality = item.quality - 1
                        } else {
                            item.quality = item.quality - 2
                        }
                    } else {
                        item.quality = item.quality - item.quality
                    }
                } else {
                    item.quality = item.quality + 1
                }
            }

            // Ensuring Quality Boundaries
            if (item.quality > 50) item.quality = 50;
            if (item.quality < 0) item.quality = 0;
        }

        return this.items;
    }
}
