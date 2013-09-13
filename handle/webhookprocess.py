import os
import argparse

def webhookprocess(info_ref):
    if info_ref == "refs/heads/master":
        pass
    elif info_ref == "refs/heads/sainy":
        os.chdir("/home/buildbot/acad_buildbot")
        os.system("ls; pwd")
        #os.system("git pull origin sainy")
        print "success."
        #os.system("buildbot restart")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='handle webhook to automatic deplopment')
    parser.add_argument('-r', '--ref', dest='info_ref', help='ref to update', required=True)
    args = parser.parse_args()

    webhookprocess(args.info_ref)



