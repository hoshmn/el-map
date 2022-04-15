import React from "react";
import ChartsStyle from "./Charts.style";
import { ChartControls, LineChart } from "./components";
import {
  useCurrentContext,
  useLocationData,
  useRemoveLocation,
} from "@hyperobjekt/react-dashboard";
import { useMaxLocations } from "../hooks";
import { Box } from "@mui/system";
import { LocationHeader } from "../components";
import { getColorForIndex } from "../utils";
import ParentSize from "@visx/responsive/lib/components/ParentSize";

const Charts = () => {
  const { bubbleMetric } = useCurrentContext(); // { bubbleMetric, choroplethMetric, year, region_id, ... }
  const maxLocations = useMaxLocations();
  const locations = useLocationData(maxLocations);
  const removeLocation = useRemoveLocation();
  // TODO: implement handlers
  const handleDismissLocation = (location) => (event) => {
    removeLocation(location);
  };
  const handleChartHover = () => {};
  const handleToggleMarginOfError = () => {};
  const handleMetricChange = () => {};
  return (
    <ChartsStyle className="charts__root">
      <ChartControls
        className="charts__controls"
        activeMetric={bubbleMetric}
        onMetricChange={handleMetricChange}
        onToggleMarginOfError={handleToggleMarginOfError}
      />
      <div className="charts__chart-wrapper body__content">
        <ParentSize>
          {({ width, height }) => (
            <LineChart
              className="charts__line-chart"
              locations={locations}
              onHover={handleChartHover}
              width={width}
              height={400}
              margin={{
                left: 80,
                right: 20,
                top: 60,
                bottom: 50,
              }}
            />
          )}
        </ParentSize>
        <Box className="charts__legend">
          {locations.map(({ GEOID, n, pl }, i) => (
            <LocationHeader
              key={GEOID}
              marker
              name={n}
              parentName={pl}
              color={getColorForIndex(i)}
              onDismiss={handleDismissLocation(GEOID)}
            />
          ))}
          <LocationHeader
            marker
            name="National Average"
            color={getColorForIndex(3)}
          />
        </Box>
      </div>
    </ChartsStyle>
  );
};

export default Charts;
