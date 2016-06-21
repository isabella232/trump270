{% import '_macros.html' as macros %}

Nearly every week, you'll hear political analysts debate the same question -- does Donald Trump have a path to the White House? And, if so, what would it take to for the presumptive GOP nominee to get 270 electoral votes? You've probably heard half a dozen hypothetical scenarios - all interesting - but more qualitative than quantitative.

We wanted a data-driven analysis - to see what demogrpahics could tell us about the feasibiity of a Trump victory in November.

During the primary season, demographics, as the old saying goes, were truly often destiny. Analyzing how different demographic groups voted in one state was often the best guide in understanding how they would vote in another state.

Demographic analysis is by no means a crystal ball, but it is, perhaps, the most useful predictor (more on the methodology below).

To start off, we looked at the 2012 election map, and created a list of 19 states -- a combination of traditionally accepted battleground states and potentially reversible states (that lean Republican or Democrat), based on the guidance that NPR's political editor Domenico Montanaro outlined earlier this spring. And then for kicks - we decided to add in New York because Trump is fond of saying he can win his home state- quote him.


## Remind me - how did the 2012 map look?

<img src="assets/cartogram-placeholder.png"/>

President Obama won the 2012 election by 126 electoral votes -- 332 to 206. In the last four years, the population and the demographics of the country have changed in ways that favor a generic Democratic candidate today even more convincingly. The current demographics of the country are changing in irreversible ways; just consider - the current under-age five population in the country is now majority-minority, according to the Census Bureau.

These demographic changes make it nearly impossible for a Trump-like Republican candidate, who offends Latinos and Asian-Americans, to win the presidency in future elections.

But, the big question is - has the door already closed? Or could Trump still have a viable path to 270 given current demographics?

This November, the electorate is expected be the most racially diverse in history. But still, an estimated 72 percent of voters are expected to be white, according to a Brookings Institution March analysis of Current Population Survey numbers from the Census Bureau. And those white voters hold tremendous political power. Trump seems to be trying to boost his popularity among them, specifically courting white men, in the hopes of winning rust belt states and flipping Ohio and Pennsylvania red.

## What does the 2016 electoral map look like?

<img src="assets/cartogram-placeholder.png"/>

With the help of Census data and Bill Frey, a demographer at the Brookings Institute, we estimated the current voting population in each of our 20 states (more on the methodology below).

We used 2016 demographics and superimposed that on 2012 exit poll data to see how a generic Democrat or Republican would do today, assuming he/she got Mitt Romney/Barack Obama levels of support.

So, in a nutshell, if Obama was running for president today and he performed just as well with different race/gender groups, as he did in 2012, how would he do?

Our map paints a slightly more favorable map for him; in which he would win by 128 electoral votes: 333 - 205.

This is to say - assuming there's absolutely no change in turnout or levels of support - Trump has a hugely uphill battle.

Basic demography favors the Democrats.

## HOW CAN TRUMP WIN? WHAT IF WE BOOST WHITE MALE TURNOUT AND THE WHITE  MALE MARGIN OF VICTORY?

Trump insists he's bringing out new voters, and the basic demographic premise of his primary run was that he could boost white male turnout and simultaneously increase white male margins of support for his candidacy.

So, we tested those ideas.

We increased white male turnout in each of these potentially flippable states by 2 percent.

{{ macros.model_table('wh-turnout', white_man_turnout=0.02, interactive='disabled')}}

And while that helps Trump, he's still far from the finish line. Our analysis shows he would win Ohio and Pennsylvania but still lose the election by 88 votes, 313 - 225.

We then tested the second idea - that Trump could win white men by 4 percent more than Mitt Romney did in 2012.

And again we held all other demographic groups constant.

{{ macros.model_table('wh-pct', white_man_pct=0.04, interactive='disabled')}}

If Trump could do that, he has a viable path to the White House. He could theoretically win by 18 electoral votes, 278 - 260.

Now, if he could both boost turnout among white men (by 2 percent) and also win them more convincingly (4 percent more than Mitt Romney), while managing to win white women, Latinos, Asians and African-Americans at Mitt Romney levels of support, then he's got the best shot at the White House.

We found that he could flip Colorado, Florida, and Pennsylvania.

{{ macros.model_table('wh-turnout-pct', white_man_turnout=0.02, white_man_pct=0.04, interactive='disabled')}}

Our basic demographic calculations for 2016 show Ohio going to the Republicans by a hair. And North Carolina and Georgia potentially going Democrat; but boosting turnout would flip both of these states red again.

And, Trump would win the election 294 - 244.

## HOLD UP - WHAT IF HE LOSES FLORIDA?

In all the simulations above we assume that Trump only has an effect in boosting support for Republicans; but he might also boost support for Democrats - as a reaction to his policies and rhetoric. In particular, the big question is - could he manage to maintain Mitt Romney levels of support among Latinos.

Our demographic analysis shows that an estimated 19 percent of Florida voters this November are likely to be Latino.

And in order for Trump to win Florida we assume Hispanics would support him at the same levels they voted for Romney. But in Florida that could be tough; Romney won 39 percent of Hispanic voters in 2012. If Trump can't do the same, our hypothesis falls apart.

Recent national polls show Trump is capturing closer to 21 percent of the Latino vote. (For some perspective, Romney got 27 percent nationally in 2012).

So if we adjust Trump's Latino level of support in Florida to his current polling average of 21 percent, the state flips blue again and Clinton would win the White House, 273-265.

{{ macros.model_table('hispanic-pct', hispanic_pct=-0.06, interactive='disabled')}}

## So, then could he win WI or MI instead?

If Trump loses Florida, he'll need to find another state (or two) to make up for those 29 electoral votes.

He could circle back to the Rust Belt and try to win Wisconsin and/or Michigan.

Michigan seems far-fetched. Even assuming Trump boosts white male turnout by two percent, he would still need to win 80 percent of white men to flip the state.

In Wisconsin, his odds seem better. He would need the support of 64 percent of white men (Mitt Romney won 56 percent). If he could do that, he could flip the electoral map back in his favor, 275-263.

Luckily for Trump - he wouldn't need both Wisconsin and Michigan. One or the other would be sufficient to carve a path to the White House.

For Trump, the most viable route goes through Arizona, Indiana, Ohio, Pennsylvania, Colorado, North Carolina, Georgia and Wisconsin.

And if can squeeze through all those states, he could be the next president.

## Things that make you go hm...

Three major interesting takeaways:

1) Virginia, which has long been considered a traditional battleground state, seems fairly convingly Democratic this election cycle - given the changing demographics of the state.

2) Ohio and Pennsylvania both feasibly seem like they could go for Trump if he can boost white male turnout by a few points. Ohio, in particular, will be key to watch - it seems like it could go blue or red depending on which way the wind blows. Just a 1.5 percent shift in how white women vote could flip the state.

3) Since Trump often imagines winning New York, we wanted to see what it would take for him to realistically turn his home state Republican. Assuming all other demographics groups vote exactly as they did in 2012, and assuming turnout also remains constant, Trump would need to win 97 percent of white men in New York. 97 percent.


## Can I play with these numbers?

Throughout all of these simulations, we never changed how white women or black folks would vote in November. President Obama lost white women by 14 points in the 2012 election (42 - 56 percent).

Early polling suggests Clinton is making inroads with white women and many analysts have suggested that if Trump boosts turnout for white men, he's likely to inadvertently also boost turnout/support for Clinton among white women/Latinos.

You can adjust turnout and levels of support here to see what combination makes sense to you, and how you, personally, could create a roadmap to 270 for Donald Trump.

{{ macros.model_table('interactive') }}

## Methodology

Thanks to the guidance and expertise of Bill Frey, a demographer at the Brookings Institution, we broke down the current electorate into five categories: white men, white women, black, latino and other.

We used 2012 turnout rates as compiled by the Census for individual states and multiplied that by the current number of 2016 eligible voters, as indicated by the March Current Population Survey as citizens above the age of 18.

That gave us an estimated voter population for each category. We then multiplied that by the margins of support found in 2012 exit polls for each group, to achieve an estimated level of support for Donald Trump and Hillary Clinton in 2016.

One note: we're accounting for all white men as a block, but as Bill Frey with the Brookings Institution cautions - white college-educated men are more likely to support a Democratic candidate than their white working class brethren. And that could be important in states like Colorado.


