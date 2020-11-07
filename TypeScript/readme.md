# An explanation of my thoughts

My first thoughts were for tests. As this was a refactor test, I needed to ensure that the tests adequately covered the existing functionality before I could make any changes.

Once the tests were in, covered all the main elements outlined in the Specification, I could make a start on the new items.

I once again started by adding tests, to ensure that any code written for the new items would also be tested.

Once the tests were complete (and failing), I updated the updateQuality function to include the new item type.

I found the function difficult to grok, as the flow was essentially nested if statements, so I started refactoring to simplify this.

Firstly, I created an escape hatch for Legendary items, as they are unchanged by the code. This reduced the complexity of the if statements (as there was no longer a need to check for the legendary item) and should have increased the performance, as the legendary items were no longer being fully processed.

I then created a function that would be used to identify the item type easily (rather than relying on string comparisons of the name) and moved the nested if statements into a single switch statement, which is easier (for me) to grok (as all code relating to an item type is in one place) and is usually more performant.

With this in place, I also added boundary checks at the end of the function, to ensure that the item quality would never increase or decrease beyond the business logic boundaries.

Finally, I broke out the item <-> item type linkages into arrays, so that it would be possible to easily add new items to existing types without affecting any of the business logic, and also paving the way to integrate with an external datasource, if required. This does actually reduce the performance of the function, as it is checking an item type against an array instead of a string, but I thought the potential benefits outweighed the losses.

After each change, I tested my code against the tests, to ensure my updates had not affected the outputs of the function.