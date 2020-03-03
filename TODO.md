### TODO:

1. Update touch positions: split into separate methods for each event (start, move, end). For each event, return an object that has the index and new values of the changed positions (as well as setting positions as normal).
2. Update useSynth to make use of the updated touch methods so that frequency gets changed on move and attack release is triggered on end for the appropriate synths (by index)
