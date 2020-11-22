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

class ExtendedItem extends Item {
    sellInMultiplier: number = -1;
    qualityMultiplier: number = -1;
    minQuality: number = 0;
    maxQuality: number = 50;

    updateItem() {
        this.updateSellIn();
        this.updateQuality();
    }

    updateSellIn() {
        this.sellIn = this.sellIn + this.sellInMultiplier;

        if (this.sellIn < 0) this.qualityMultiplier = this.qualityMultiplier * 2;
    }

    updateQuality() {
        this.quality = this.quality + this.qualityMultiplier;

        if (this.quality < this.minQuality) this.quality = this.minQuality;
        if (this.quality > this.maxQuality) this.quality = this.maxQuality;
    }
}

class Legendary extends ExtendedItem {
    sellInMultiplier: number = 0;
    qualityMultiplier: number = 0;

    updateSellIn() { /* Legendary Items do not change */ }
    updateQuality() { /* Legendary Items do not change */ }
}

class Conjured extends ExtendedItem {
    qualityMultiplier: number = -2;
}

class Cheese extends ExtendedItem {
    qualityMultiplier: number = 1;
}

class Backstage extends ExtendedItem {
    updateQuality() {
        if (this.sellIn < 0) {
            this.quality = 0;
        } else if (this.sellIn >= 0 && this.sellIn <= 4) {
            this.quality = this.quality + 3;
        } else if (this.sellIn >= 5 && this.sellIn <= 9) {
            this.quality = this.quality + 2;
        } else {
            this.quality = this.quality + 1;
        }
    }
}

export class GildedRose {
    items: Array<ExtendedItem>;

    constructor(items = [] as Array<Item>) {
        this.items = items.map(item => {
            switch (item.name) {
                case "Sulfuras, Hand of Ragnaros":
                    return new Legendary(item.name, item.sellIn, item.quality);
                case "Conjured Mana Cake": 
                    return new Conjured(item.name, item.sellIn, item.quality);
                case "Aged Brie": 
                    return new Cheese(item.name, item.sellIn, item.quality);
                case "Backstage passes to a TAFKAL80ETC concert":
                    return new Backstage(item.name, item.sellIn, item.quality);
                default:
                    return new ExtendedItem(item.name, item.sellIn, item.quality);
            }
        })
    }

    updateQuality() {
        for (let i = 0; i < this.items.length; i++) {
            this.items[i].updateItem();
        }

        return this.items;
    }
}
