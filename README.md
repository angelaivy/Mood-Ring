# Mood-Ring
“Mood Ring” is a  React web application that allows users to track their daily moods using emojis, store entries in Firebase, and visualize emotional trends over time. Users can log moods, review their history, and view simple data visualizations like weekly mood summaries to gain insight into their patterns.

## 1. What worked well in this project

What worked well in the project for me was the planning phase. That really helped me get started and break things down into a checklist that I could work through. It made the work more managable. In doing the actual work, setting up the routes, links, and basic components worked well for me. I had a pretty good grasp on those concepts. And actually working with firebase didn't go too bad, even though this class was my first time working with firebase.

## 2 What didn't work well?

Difficult state manangement. The hardest part for me was that I chose to re-use my form for both the adding and editing of moods, which requried the same form fields but different functionaliy. Adding an entry happens on the home page, where the form is shown right away, and then hidden on submit. Whereas on the history page (mood memories) the form is not shown, it's revealed by the edit button. So it's hidden first and shown on edit. The mood memories page has "cards" which have the edit and delete button and their own component. The edit button click handler function actually happens in the form, so this all got a little compicated with having to manage the visibility + firebase add/edit functions throughout different components. 

## 3 What changes would you make to this project now that it's deployed?

I would have added a linter in the beginning so my code was more consistent, without having to tink about that manually. Spacing, semicolons, etc. And I'd probably want to get feedback on the form situation listed above so I could get a better grasp on the state management. But overall, I'm pretty happy with how this project turned out. 

## 4 What would you improve and/or add to this project now that it's deployed?

I'd like to add pagination or some sort of filter for the mood memories page so that when you have a lot of entries it's not just one long scrolling list. And I think there could be better error handling in general. 