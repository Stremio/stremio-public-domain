# stremio-public-domain

Welcome to the **stremio-public-domain**  GitHub repository! Our mission is to preserve and celebrate the vast realm of public-domain works. Here, we've curated a collection of metadata and streaming links for a diverse array of captivating public-domain content. Through the Stremio media platform, users can access and enjoy these timeless creations. As valued contributors, you have the power to enrich this collection further by adding entries to the `include/meta.json` and `include/streams.json` files. To ensure the integrity of our collection, we also employ the `exclude/meta.json` file, which acts as a manual filter to safeguard against any unintentional inclusion of copyrighted material. Join us in our efforts to preserve the heritage of public-domain entertainment for generations to come!

## How to Contribute

We welcome contributions from all users who want to help expand our collection of public-domain works. Here's how you can contribute: 
1. Fork this repository to your GitHub account. 
2. Clone the forked repository to your local machine:

```bash
git clone https://github.com/stremio/stremio-public-domain.git
``` 

3. Navigate to the `include` directory, where you will find two JSON files: 
- `meta.json`: This file contains an array of IMDB IDs. Each IMDB ID represents a public-domain work. To contribute, add new IMDB IDs. 
- `streams.json`: This file contains an array of [stream objects](https://github.com/Stremio/stremio-addon-sdk/blob/master/docs/api/responses/stream.md). Each stream object represents a streaming link for a public-domain work listed in the `meta.json` file. To contribute, add new [stream objects](https://github.com/Stremio/stremio-addon-sdk/blob/master/docs/api/responses/stream.md). Make sure the streaming links are legitimate and functional. 
1. Once you have made the necessary additions, commit your changes and push them to your forked repository:

```bash
git add include/meta.json include/streams.json
git commit -m "Added new public-domain entries"
git push origin main
``` 

5. Create a pull request from your forked repository to the original **stremio-public-domain**  repository. 
6. Your contribution will be reviewed, and if everything is in order, it will be merged into the main repository. Congratulations, you have successfully contributed to the project!

## Exclusion of Content

To ensure that the repository only contains public-domain works, we have a mechanism for excluding copyrighted content. The `exclude/meta.json` file contains IMDb IDs that should be excluded from the final results. If you come across any copyrighted works that have been mistakenly included, you can add the IMDb IDs of those works to this file.

## License

This repository is open-source and licensed under the [MIT License](/LICENSE) . By contributing to this project, you agree to your contributions being licensed under the same MIT License.

We hope you find this repository valuable and enjoy contributing to it. Happy coding!

If you have any questions or need further assistance, please don't hesitate to contact us via GitHub issues or other appropriate channels.