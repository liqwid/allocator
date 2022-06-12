# allocator

Calculates APY of stablecoin investments based on allocation into different strategies.

### Available stablecoins

**DAI**: Dai, a fiat-pegged stablecoin

**USDC**: USD Coin, a fiat-pegged stablecoin

**USDT**: Tether, a fiat-pegged stablecoin

### Available strategies

**Aave**: Lending protocol, allows to earn fixed interest or interest based on deposited asset supply & demand

**Compound**: Lending protocol, interest is automatically adjusted based on deposited asset supply & demand

**Convex**: aggregation platform for Curve liquidity protocol and DeX

## Installation

Run `yarn`

## Tests

Run `yarn test`

Integration tests are in the `src/__tests__` folder and unit tests are `.spec.ts` files next to tested implementations

## Usage

### CLI

Run `yarn start:cli`

Input data is in the `allocations.csv` file;

Column headers are Strategies and rows names are coins.

Cell values represent allocation of coin between strategies in percents. Total allocation of each coin (sum of the row values) must equal 100%.

Example of a correctly formatted csv:

```
coin, Aave, Compound, Convex
DAI, 30, 20, 50
USDC, 50, 10, 40
USDT, 80, 2, 18
```

**CLI Params**:

`--path` : Custom file location. Default value: `./accations.csv`

`--auto` : Calculates best possible allocation automatically, makes `--path` param obsolete
