# boldbi-themestudio
The theme studio for the BoldBI designer client can be used to customize a theme.

## Development Environment

* Node.js version – 8.1.11 +
* NPM version – 6.1.0 +

## Prepare Environment

You can check out the source from the repository below:
https://github.com/boldbi/boldbi-themestudio

Once you check out the source, open the command prompt and change the working directory to the root directory of source. 
 

* Install node.js in your machine. You can download node.js from the link below:
  https://nodejs.org/en/download/ 

* Install gulp in your machine by the command below: 

```csharp
npm install gulp -g
```

* Install the required packages by the command below: 

```csharp
npm install
```


* To build source.

```csharp
gulp build
```
* Once the build is completed, you can get the theme files from the directory below. You can copy the file and refer too it while embedding the boldbi dashboards. 
```csharp
{src directory}/assets/themes/{theme directory name}/boldbi.theme.definition.min.css
```

* Please download the embedded configuration file from the BoldBi server page and paste it into the root directory to get the embedded related details, and run the sample. 
https://help.boldbi.com/cloud-bi/site-administration/embed-settings/#get-embed-configuration-file 


* To run the sample, execute the command below:

```csharp
gulp run-sample
```

* Once you execute the command above, the sample will be hosted in 
http://localhost:8080/


## How to refer to the local theme file in your application

After running the `gulp build` command, we generated the custom theme file in the light and dark theme basis. You can get that file from the assests folder and refer to it in your embedded application. If you want your own customization file means, please refer to the help document below: 

https://help.boldbi.com/cloud-bi/site-administration/look-and-feel-settings/#How-to-create-custom-application-theme
