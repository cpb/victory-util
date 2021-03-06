[![Travis Status][trav_img]][trav_site]

Victory Helpers & Utilities
===========================

```shell
npm install victory-util
```

Usage:

Access all utils at once:

```javascript
import Util from "victory-util";

Util.Log.warn("Uh oh!");
Util.Style.toTransformString({ rotate: 90 });
```

Or be more selective:

```javascript
import { warn } from "victory-util/lib/log";
import { containsStrings, containsOnlyStrings } from "victory-util/lib/collection";
import * as VictoryPropTypes from "victory-util/lib/prop-types";
```

## Development

Please see [DEVELOPMENT](https://github.com/FormidableLabs/builder-victory-component/blob/master/dev/DEVELOPMENT.md)

## Contributing

Please see [CONTRIBUTING](https://github.com/FormidableLabs/builder-victory-component/blob/master/dev/CONTRIBUTING.md)

[trav_img]: https://api.travis-ci.org/FormidableLabs/victory-util.svg
[trav_site]: https://travis-ci.org/FormidableLabs/victory-util
