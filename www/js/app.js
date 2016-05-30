/*
 * Run on page load.
 */
var adjustments = {
    'adjustments': {
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
        }
    }
}

var tossUpStates = _.pluck(baseData.data, 'state');

var onDocumentLoad = function(e) {
    dataTableRactive = new Ractive({
        el: '#margin-table',
        template: '#margin-table-template',
        data: makeOutcomes()
    });

    controlsRactive = new Ractive({
        el: '#table-controls',
        template: '#controls-template',
        data: adjustments,
    });

    controlsRactive.observe('*', watchControl);
}

var watchControl = function(e) {
    var outcomes = makeOutcomes();
    dataTableRactive.set('rows', outcomes.rows);
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
        adjustments.adjustments.white_man.pct = adjustment;
        var outcome = calculateOutcome(adjustments);
        _.each(outcome, function(row) {
            var marginPct = Math.abs(row.margin) * 100;
            var winnerClass = (row.margin > 0) ? 'gop' : 'dem';
            var marginClass = 'margin-' + marginPct.toFixed(0);

            outcomes[row.state].push({
                winnerClass: winnerClass,
                marginClass: marginClass,
                margin: marginPct.toFixed(1)
            });
        });
    }

    return {
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
            var adjustment = adjustments.adjustments[demographic.demographic];

            var adjustedDemPct = demographic.d_pct - adjustment.pct;
            adjustedDemPct = (adjustedDemPct < 0) ? 0 : adjustedDemPct;
            adjustedDemPct = (adjustedDemPct > 1) ? 1 : adjustedDemPct;

            var adjustedGOPPct = demographic.r_pct + adjustment.pct;
            adjustedGOPPct = (adjustedGOPPct < 0) ? 0 : adjustedGOPPct;
            adjustedGOPPct = (adjustedGOPPct > 1) ? 1 : adjustedGOPPct;

            var adjustedTurnout = demographic.turnout + adjustment.turnout;
            adjustedTurnout = (adjustedTurnout < 0) ? 0 : adjustedTurnout;
            adjustedTurnout = (adjustedTurnout > 1) ? 1 : adjustedTurnout;

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
