/*
 * Run on page load.
 */
var adjustments = {
    'white_man': {
        'pct': 0.0,
        'turnout': 0.0,
    },
    'white_woman': {
        'pct': 0.0,
        'turnout': 0.0,
    },
    'black': {
        'pct': 0.0,
        'turnout': 0.0,
    },
    'hispanic': {
        'pct': 0.0,
        'turnout': 0.0,
    },
    'other': {
        'pct': 0.0,
        'turnout': 0.0,
    },
}

var marginData = {};
var tossUpStates = _.pluck(baseData.data, 'state');

var onDocumentLoad = function(e) {
    makeOutcomes();

    var dataTableRactive = new Ractive({
        el: '#margin-table',
        template: '#margin-table-template',
        magic: true,
        data: marginData
    });
}

var makeOutcomes = function() {
    var outcomes = {}
    var adjustmentLabels = [];
    for(var i = 0; i < tossUpStates.length; ++i) {
        var state = tossUpStates[i];
        outcomes[state] = [];
    }

    for (var i = 0; i < 9; ++i) {
        var adjustment = i * 0.01;
        adjustmentLabels.push({label: '+'+ (adjustment * 100).toFixed(0) + '%'});
        adjustments.white_man.pct = adjustment;
        var outcome = calculateOutcome(adjustments);
        _.each(outcome, function(row) {
            if (row.margin > 0) {
                var winner = 'gop';
            } else {
                var winner = 'dem';
            }
            var absMargin = Math.abs(row.margin);

            if (absMargin < 0.02) {
                var victoryMargin = 'small';
            /*} else if (absMargin >= 0.02 && absMargin < 0.04) {
                var victoryMargin = 'medium'; */
            } else {
                var victoryMargin = 'large';
            }

            outcomes[row.state].push({
                winner: winner,
                marginType: victoryMargin,
                margin: row.margin
            });
        });
    }

    marginData = {
        labels: adjustmentLabels,
        rows: outcomes
    }
}

var calculateOutcome = function(adjustments) {
    var processedData = [];
    _.each(baseData.data, function(row) {
        var processedRow = {};
        processedRow.state = row.state;

        var projectedGOPVotes = 0;
        var projectedDemVotes = 0;
        var adjustedGOPVotes = 0;
        var adjustedDemVotes = 0;
        var adjustedOtherVotes = 0;

        _.each(row.demographics, function(demographic) {
            var adjustment = adjustments[demographic.demographic];

            var adjustedDemPct = demographic.d_pct - adjustment.pct;
            var adjustedGOPPct = demographic.r_pct + adjustment.pct;
            var adjustedTurnout = demographic.turnout + adjustment.turnout;
            var adjustedVotes = demographic.eligible_voters * adjustedTurnout;

            adjustedOtherVotes = Math.abs(demographic.r_pct - demographic.d_pct) * demographic.eligible_voters * demographic.turnout;
            adjustedGOPVotes += adjustedVotes * adjustedGOPPct;
            adjustedDemVotes += adjustedVotes * adjustedDemPct;
        });

        var adjustedTotalVotes = adjustedGOPVotes + adjustedDemVotes + adjustedOtherVotes;
        processedRow.demPct = adjustedDemVotes / adjustedTotalVotes;
        processedRow.gopPct = adjustedGOPVotes / adjustedTotalVotes;
        processedRow.margin = processedRow.gopPct - processedRow.demPct;

        processedData.push(processedRow);
    });
    return processedData;
}

document.addEventListener('DOMContentLoaded', onDocumentLoad);
