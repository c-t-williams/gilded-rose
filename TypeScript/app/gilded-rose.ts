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

    // items by type
    legendary: Array<string> = ['Sulfuras, Hand of Ragnaros'];
    cheese: Array<string> = ['Aged Brie'];
    backstage: Array<string> = ['Backstage passes to a TAFKAL80ETC concert'];
    conjured: Array<string> = ['Conjured Mana Cake'];

    getType(item = {} as Item) {
        if (this.legendary.indexOf(item.name) >= 0) return 'Legendary';
        if (this.cheese.indexOf(item.name) >= 0) return 'Cheese';
        if (this.backstage.indexOf(item.name) >= 0) return 'Backstage Pass';
        if (this.conjured.indexOf(item.name) >= 0) return 'Conjured';

        // If none of the above, the item must be Standard
        return 'Standard';
    }

    updateQuality() {
        for (let i = 0; i < this.items.length; i++) {
            let item: Item = this.items[i]; // Adding shorthand reference
            let multiplier: number = 1; // Quality Multiplier
            const itemType: string = this.getType(item); // Getting Item Type

            // Escape hatch, ignoring Legendary Items
            if (itemType === 'Legendary') continue;

            // Decrease Sellby Date
            item.sellIn = item.sellIn - 1;

            // Update multiplier if sellIn is less than 0
            if (item.sellIn < 0) multiplier = 2;

            // Switches are more readable and usually more performant than multiple if statements
            switch (itemType) {
                case 'Cheese':
                    item.quality = item.quality + (multiplier * 1);

                    break;
                case 'Backstage Pass':
                    if (item.sellIn < 0) {
                        item.quality = 0;
                    } else if (item.sellIn >= 0 && item.sellIn <= 4) {
                        item.quality = item.quality + 3;
                    } else if (item.sellIn >= 5 && item.sellIn <= 9) {
                        item.quality = item.quality + 2;
                    } else {
                        item.quality = item.quality + 1;
                    }

                    break;
                case 'Conjured':
                    item.quality = item.quality - (multiplier * 2);
                    break;
                default: 
                    item.quality = item.quality - (multiplier * 1);
            }

            // Ensuring Quality Boundaries
            if (item.quality > 50) item.quality = 50;
            if (item.quality < 0) item.quality = 0;
        }

        return this.items;
    }
}
