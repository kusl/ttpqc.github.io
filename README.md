Contributing 
============
You can push to both the open shift instance and the gitlab repository with one command with this simple trick. 

    `git remote set-url --add --push origin ssh://5943e4b20c1e669249000116@music-mydroid.rhcloud.com/~/git/music.git` 
    `git remote set-url --add --push origin git@gitlab.com:kush/jukebox.git` 

Then, when you do `git remote show origin`, you will see: 

    $ git remote show origin
    * remote origin
    Fetch URL: ssh://5943e4b20c1e669249000116@music-mydroid.rhcloud.com/~/git/music.git/
    Push  URL: ssh://5943e4b20c1e669249000116@music-mydroid.rhcloud.com/~/git/music.git/
    Push  URL: git@gitlab.com:kush/jukebox.git
    HEAD branch: master
    Remote branch:
        master tracked
    Local branch configured for 'git pull':
        master merges with remote master
    Local ref configured for 'git push':
        master pushes to master (up to date)

As you imagine, this will not fetch any changes from gitlab. 
The rhcloud version is canonical and shall trump in case of any conflict. 

