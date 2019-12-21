#! /bin/bash

GRID_SIZE=100

echo "<plotty: draw, $GRID_SIZE>"
sleep 5
for I in {1..50}
do
  echo "<plotty: infected, $I>"
  sleep 0.5
  echo "<plotty: infected, "$(($GRID_SIZE + 1 - $I))">"
  sleep 0.5
done
