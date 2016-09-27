# Magic Mirror Module: mmm-food2fork-recipes
This [MagicMirror2](https://github.com/MichMich/MagicMirror) module allows you to download JSON and show random recipes from Food2Fork API

Collected from http://food2fork.com/about/api -- http://food2fork.com/

## Installation

In your terminal, go to your MagicMirror's Module folder:
````
cd ~/MagicMirror/modules
````

Clone this repository:
````
git clone https://github.com/spectroman/mmm-food2fork-recipes.git
````

Configure the module in your `config.js` file.

## Using the module

Now add the module to the modules array in the `config/config.js` file:
````javascript
                {
                        module: 'mmm-food2fork-recipes',
                        position: 'top_left',
                        header: 'Recipe Ideas List',
                        config: {
                                APIkey: "5x1x6xf0x5x02xf8xx1x7x8x8xax0x2x", // after creating a user there u can get ur key
                                listSize: 4,
                                daysTable: { // for each day of the week you can select a word to search and generate random lists on magic mirror - 0 sunday , 1 monday and so forth
                                                "1": "natural",
                                                "2": "chicken",
                                                "3": "vegan",
                                                "4": "indian",
                                                "5": "japanese",
                                                "6": "quick",
                                                "0": "vegetarian"
                                }
                        }
                },
````

## Configuration options

The following properties can be configured:


<table width="100%">
        <!-- why, markdown... -->
        <thead>
                <tr>
                        <th>Option</th>
                        <th width="100%">Description</th>
                </tr>
        <thead>
        <tbody>
                <tr>
                        <td><code>APIkey</code></td>
                        <td>Key from food2fork you can get registering at their site</td>
                </tr>
                <tr>
                        <td><code>listSize</code></td>
                        <td>Amount of items to show</td>
                </tr>
                <tr>
                        <td><code>daysTable</code></td>
                        <td>An array or search words, to generate a list based on what you like on that day</td>
                </tr>
        </tbody>
</table>
