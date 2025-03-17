# full_stack_sample_problem

In this folder you will find the well know Iris data set. You may use the version included or download scikit-learn and use the copy included in the distribution:

https://scikit-learn.org/stable/auto_examples/datasets/plot_iris_dataset.html

## Goals
Please create a Flask app with a React frontend. 

You do not need to set up a database, feel free to use flat files to set up any data you need.

Create at least two users. One of which has access to only the Setosa variety of data and one of which has access to only the Virginica variety of data.

Your app should have a sign in page. - The username should be an email. Please include validation for this in the React app.

After signing in the user should be able to view two plots. The first plot should have sepal.length on the X axis and size on the Y axis. There should be three series plotted: sepal.width, petal.length, and petal.width. Please create checkboxes for each series, so that if a box is checked it's data will show up on the plot. Please also create a two sided slider which controls the upper and lower bound of the Y axis.

The second plot should be exactly like the first, but should have petal.length on the X-axis.

On the dashboard page there should be a button that says "logout" in the top right which will take the user back to the login page.

## Expectations

Your folder should include a requirements.txt for the python packages you use and package.json for the javascript packages you use. You will be assessed based on the quality, and clarity of the code, code comments, commit comments, and app functionality. 
Other than that, please prioritize the dashboard tasks described, and prepare a brief summary of what you built, what tasks you prioritized and why, as well as what steps you would implement next.

