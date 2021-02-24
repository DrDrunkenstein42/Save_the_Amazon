## Hackathon
We coded this as part of the TISB Hackathon 2021. This project tied for **first** place.

## Inspiration
We realised how adverse the environmental effects of our purchases on e-commerce sites are, and decided to spread awareness about this issue. Eco-meter is **browser extension for Google Chrome** that estimates the environmental impact of products on Amazon.

## What it does
The chrome extension conducts its activities in 3 phases. 

 - It _scrapes_ required product info, such as item category, weight, country of origin, materials and delivery address, from the product page on Amazon.
 - It feeds the data into a function that _calculates_ the approximate quantity of air and water toxins that are released into the environment during processes such as mining, agriculture, manufacturing and shipping.
- It _displays_ the output in the form of a popup on the browser window for the user to view. 

## How we built it
The extension is built primarily with JavaScript using open-source chrome APIs, with some HTML and CSS to design the popup that would be displayed to the user. The first step was to research the quantity of toxins released into the environment in the various processes involved in bringing a certain product to your doorstep. Having done this, we wrote a script to _scrape_ relevant data from the Amazon webpage. Subsequently, we wrote another script to _send the data_ to the popup, and display it with attractive UI.

## Challenges we ran into
We first struggled to find **reliable numbers from reliable sources** about the environmental impacts of certain materials. Eventually, we found some useful statistics to help us from research papers and articles. Also, as this was the first web extension we developed, there were some **structural issues** and some problems in **efficiently implementing the Chrome APIs**. We have solved these issues as well in a short time frame.

## Accomplishments that we're proud of
Apart from this being the **first web extension we have developed**, it gives us satisfaction to _draw attention to a largely ignored side-effect of the products we use_. We largely look upon factories and the transportation sector as major sources of global pollution, however, think little about how our own purchases contribute to the same.

## What we learned
On the technical side, we learnt _how to build a web extension_ using various open source developer tools provided by Google Chrome. Another major takeaway from this project was **becoming aware ourselves** of how our daily purchases affect the environment negatively, and what we can do to curb it.

## What's next for Eco-meter
After launching this extension on the Chrome web store, we look to **expand the number of product categories** our extension works on, and eventually develop it into a _consumer platform_, which will in turn raise awareness. In due course, we can also use the platform to pressure industries to publish detailed data about their carbon emissions, discharges into water bodies and other unsustainable manufacturing practices.
