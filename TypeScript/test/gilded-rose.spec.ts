import { expect } from "chai";
import { Item, GildedRose } from "../app/gilded-rose";

describe("Gilded Rose", function () {
  // Standard Items
  //new Item("+5 Dexterity Vest", 10, 20),
  //new Item("Elixir of the Mongoose", 5, 7), //

  // Standard Items
  it("Standard items should decrease SellIn and Quality by 1", function () {
    const gildedRose = new GildedRose([new Item("+5 Dexterity Vest", 10, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(9);
    expect(items[0].quality).to.equal(19);
  });

  it("Standard items should never decrease Quality below 0", function () {
    const gildedRose = new GildedRose([new Item("+5 Dexterity Vest", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
  });

  it("Standard items should decrease Quality twice as fast when SellIn below 0", function () {
    const gildedRose = new GildedRose([new Item("+5 Dexterity Vest", 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(8);
  });

  // Cheese (Gromit)
  it("Cheese should decrease SellIn but increase Quality by 1", function () {
    const gildedRose = new GildedRose([new Item("Aged Brie", 10, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(9);
    expect(items[0].quality).to.equal(21);
  });

  it("Cheese should increase Quality twice as fast when SellIn below 0", function () {
    const gildedRose = new GildedRose([new Item("Aged Brie", 0, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(22);
  });

  it("Cheese should never increase Quality above 50", function () {
    const gildedRose = new GildedRose([new Item("Aged Brie", 0, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
  });

  // Legendary Items
  it("Legendary Items should never decrease in SellIn or Quality", function () {
    const gildedRose = new GildedRose([
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(0);
    expect(items[0].quality).to.equal(80);
  });

  // Backstage Passes
  it("Backstage Passes should decrease SellIn by 1 but increase Quality by 1 (when more than 10 days before the event)", function () {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 20, 20),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(19);
    expect(items[0].quality).to.equal(21);
  });

  it("Backstage Passes should decrease SellIn by 1 but increase Quality by 2 (when between 10 and 6 days before the event)", function () {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 6, 20),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(9);
    expect(items[0].quality).to.equal(22);
    expect(items[1].sellIn).to.equal(5);
    expect(items[1].quality).to.equal(22);
  });

  it("Backstage Passes should decrease SellIn by 1 but increase Quality by 3 (when between 5 and 0 days before the event)", function () {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 1, 20),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(4);
    expect(items[0].quality).to.equal(23);
    expect(items[1].sellIn).to.equal(0);
    expect(items[1].quality).to.equal(23);
  });

  it("Backstage Passes should decrease to 0 Quality (when more the event has passed)", function () {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(-1);
    expect(items[0].quality).to.equal(0);
  });
});
